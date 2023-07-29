import { useEffect } from "react"
import { useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const ApiErrorEvenHandler = () => {
  const toast = useToast()
  const isAdmin = useSelector((state) => state.user?.user?.isAdmin)

  useEffect(() => {
    // Define the event handler
    const showErrorToast = (event) => {
      toast({
        title: "Error",
        description: event.detail.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          if (isAdmin === false) {
            console.log(isAdmin)
            const currentRefreshCount = parseInt(localStorage.getItem("errorRefreshCount") || "0", 10)
            if (currentRefreshCount < 5) {
              localStorage.setItem("errorRefreshCount", (currentRefreshCount + 1).toString())
              setTimeout(() => window.location.reload(), 5000)
            } else {
              localStorage.removeItem("errorRefreshCount") // Clear the count after it reaches 5
            }
          }
        },
      })
    }

    // Attach the event listener
    window.addEventListener("apiError", showErrorToast)

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener("apiError", showErrorToast)
    }
  }, [toast, isAdmin])
}

export default ApiErrorEvenHandler
