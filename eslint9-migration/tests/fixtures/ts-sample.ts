// Sample TypeScript file for testing
interface User {
  name: string
  age: number
}

const greet = (user: User): string => {
  const message = `Hello, ${user.name}!`

  return message
}

export default greet
