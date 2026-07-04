import { useLocation, useNavigate } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function LoginPromptDialog({ open, onOpenChange }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleCreateAccount = () => {
    onOpenChange(false)
    navigate('/signup', { state: { from: location.pathname } })
  }

  const handleLogIn = () => {
    onOpenChange(false)
    navigate('/login', { state: { from: location.pathname } })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl p-6">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 cursor-pointer text-[#75716B] transition-opacity hover:opacity-70"
        >
          ✕
        </button>

        <AlertDialogHeader className="place-items-center text-center">
          <AlertDialogTitle className="text-xl font-bold text-[#26231E]">
            Create an account to continue
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            You need to log in to perform this action.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogAction
          onClick={(event) => {
            event.preventDefault()
            handleCreateAccount()
          }}
          className="mt-2 w-full cursor-pointer rounded-full bg-[#26231E] py-3 text-base font-medium text-white hover:bg-[#43403B]"
        >
          Create account
        </AlertDialogAction>

        <p className="text-center text-sm text-[#75716B]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={handleLogIn}
            className="cursor-pointer font-semibold text-[#26231E] underline"
          >
            Log in
          </button>
        </p>
      </AlertDialogContent>
    </AlertDialog>
  )
}
