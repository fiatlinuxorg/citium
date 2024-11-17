import jwt from 'jsonwebtoken'
import User from '#models/user_model'
import TokenBlacklist from '#models/token_blacklist'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import env from '#start/env'

dotenv.config()

export default class AuthController {
  public async register({ request, response }: { request: any; response: any }) {
    const { email, password, firstName, lastName } = request.body()
    try {
      // Check if user exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return response.status(400).json({ message: "L'utente esiste già" })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const user = new User({ email, password: hashedPassword, firstName, lastName })
      await user.save()

      return response.status(201).json({ message: 'Utente registrato correttamente' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Errore durante la registrazione' })
    }
  }

  public async login({ request, response }: { request: any; response: any }) {
    const { email, password } = request.body()
    try {
      // Check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        return response.status(400).json({ message: 'Credenziali invalide' })
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return response.status(400).json({ message: 'Credenziali invalide' })
      }

      // Generate token
      const token = jwt.sign({ id: user._id }, env.get('JWT_SECRET'), { expiresIn: '1h' })

      return response.status(200).json({ token })
    } catch (error) {
      return response.status(500).json({ message: 'Errore durante il login' })
    }
  }

  public async logout({ request, response }: { request: any; response: any }) {
    try {
      const token = request.header('Authorization').replace('Bearer ', '')

      // Aggiungi il token alla blacklist
      const blacklistedToken = new TokenBlacklist({ token })
      await blacklistedToken.save()

      return response.status(200).json({ message: 'Logout effettuato con successo' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Errore durante il logout' })
    }
  }
}
