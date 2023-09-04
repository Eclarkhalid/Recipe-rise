
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function UserLoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // handle login
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.status !== 200) {
      alert(' Please try again');
    } else {
      alert('Login successful');
      window.location.href = '/'
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login into your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
              )}{" "}
              GitHub
            </Button>
            <Button variant="outline">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="name"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={ev => setUsername(ev.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}