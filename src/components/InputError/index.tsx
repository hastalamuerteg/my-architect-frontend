interface IInputErrorProps {
  fallback: string
  errorMessage: string
}

export const InputError = ({ fallback, errorMessage }: IInputErrorProps) => {
  return errorMessage ? (
    <small className="text-red-300 text-xs col-span-12">{errorMessage}</small>
  ) : (
    <small className="text-orange-500 text-xs col-span-12">{fallback}</small>
  )
}
