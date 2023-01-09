import { useNavigate } from 'react-router-dom'
import home from '../../assets/home.svg'

export const Signup = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className="flex justify-center items-center">
        <div className="flex flex-col justify-start p-8">
          <h2 className="text-5xl font-bold text-orange-400">
            Join now and
            <br /> find your next architect
          </h2>
          <p className="text-md mt-4 text-gray-700">
            We are a platform focused on bringing architects and customers
            together
          </p>
          <nav className="flex items-center space-x-4 mt-8">
            <button
              className="flex justify-center items-center bg-white text-orange-500 ring ring-orange-500 rounded-md font-semibold px-4 py-3"
              onClick={() => navigate('/create-new-customer')}
            >
              I am a customer
            </button>
            <button
              className="flex justify-center items-center bg-orange-500 ring ring-orange-500 text-white rounded-md font-semibold px-4 py-3"
              onClick={() => navigate('/create-new-architect')}
            >
              I am an architect
            </button>
          </nav>
        </div>
        <picture>
          <img src={home} alt="" className="w-[30rem] h-[30rem] rounded-full" />
        </picture>
      </main>
    </>
  )
}
