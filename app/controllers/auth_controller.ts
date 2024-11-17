import jwt from 'jsonwebtoken'
import User from '#models/user_model'
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
}
