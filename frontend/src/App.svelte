<script>
  import { Router, Route } from "svelte-routing";
  import Landing from "./routes/Landing.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="/" component={Landing} />
</Router>
