import Header from "../../components/authentication/Header"
import Login from "../../components/authentication/Login"

export default function LoginPage() {
  // .kore-chat-window is not hidden then hide it
  if (!document.querySelector(".kore-chat-window") || document.querySelector(".kore-chat-window").style.display === "") {
    // hide .kore-chat-window after delay
    setTimeout(() => {
      document.querySelector(".kore-chat-window").style.display = "none";
    }, 10);
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
  )
}