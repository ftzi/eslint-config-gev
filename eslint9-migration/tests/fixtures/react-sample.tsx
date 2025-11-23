// Sample React TypeScript component for testing
import type { FC } from "react"

interface Props {
  name: string
}

const Greeting: FC<Props> = ({ name }) => {
  return (
    <div>
      {"Hello, "}
      {name}
      {"!"}
    </div>
  )
}

export default Greeting
