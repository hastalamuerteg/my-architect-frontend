import { User } from 'phosphor-react'
import { useNavigate, NavLink } from 'react-router-dom'
import customer from '../../assets/customer.svg'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateNewUser } from '../hooks/useCreateNewUser'
import { ICreateNewArchitect, ICreateNewCostumer } from '../../types'
// import { InputError } from '../../components/InputError'

const createUserSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First Name must contain at least 3 letters' })
    .trim(),
  lastName: z
    .string()
    .min(3, { message: 'Last Name must contain at least 3 letters.' })
    .trim(),
  age: z
    .string()
    .max(2, { message: 'Age must contain only 2 characters.' })
    .trim(),
  gender: z.string(),
  phone: z.string().regex(/(\(?\d{2}\)?\s)?(\d{4,5}\d{4})/),
  email: z.string().email().trim(),
  password: z.string(),
})

export const CreateNewCustomer = () => {
  const navigate = useNavigate()
  const { create } = useCreateNewUser()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ICreateNewCostumer | ICreateNewArchitect>({
    resolver: zodResolver(createUserSchema),
  })

  const handleCreateNewUser = async (
    data: ICreateNewCostumer | ICreateNewArchitect,
  ) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      password: data.password,
    }
    await create('customer', payload)
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex bg-opacity-20 mx-auto p-10 rounded-lg space-x-4">
        <div className="flex justify-start items-start p-4">
          <div className="flex flex-col items-start justify-start">
            <div className="flex justify-start items-center text-orange-500">
              <User size={32} className=" mr-2 leading-4" />
              <h3 className="text-2xl font-bold">Welcome</h3>
            </div>
            <p className="mt-4 text-gray-600 text-lg">
              Create your account now and start looking for architects for your
              next project
            </p>

            <picture>
              <img src={customer} alt="" className="w-[20rem] h-[20rem] mt-4" />
            </picture>
          </div>
        </div>
        <div className="bg-orange-300 bg-opacity-20 p-14 rounded-lg shadow-lg">
          <p className="mt-2 text-sm text-center font-semibold text-orange-500">
            Already have an account?{' '}
            <NavLink className="underline" to="/login">
              Click to login
            </NavLink>
          </p>
          <form
            className="grid grid-cols-12 gap-4 p-4"
            onSubmit={handleSubmit(handleCreateNewUser)}
          >
            <input
              className="p-3 font-medium text-sm outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12 relative"
              type="text"
              id="FirstName"
              placeholder="FirstName"
              {...register('firstName')}
            />
            {/* <InputError
            fallback="Type the first name"
            errorMessage={errors?.firstName?.message ?? ''}
          /> */}

            <input
              className="p-3 font-medium text-sm outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12"
              type="text"
              id="LastName"
              placeholder="LastName"
              {...register('lastName')}
            />
            {/* <InputError
            fallback="Type the last name"
            errorMessage={errors?.lastName?.message ?? ''}
          /> */}
            <input
              className="p-3 font-medium text-sm outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12"
              type="text"
              id="age"
              placeholder="Age"
              {...register('age')}
            />
            {/* <InputError
            fallback="  Type your age"
            errorMessage={errors?.age?.message ?? ''}
          /> */}
            <select
              className="p-3 font-medium text-sm text-zinc-400 outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12"
              id="gender"
              placeholder="Gender"
              {...register('gender')}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {/* <InputError
            fallback="  Type your gender"
            errorMessage={errors?.gender?.message ?? ''}
          /> */}
            <input
              className="p-3 font-medium text-sm outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12"
              type="phone"
              id="phone"
              placeholder="Phone number"
              {...register('phone')}
            />
            {/* <InputError
            fallback="  Type phone number"
            errorMessage={errors?.phone?.message ?? ''}
          /> */}
            <input
              className="p-3 font-medium text-sm outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12"
              type="email"
              id="email"
              placeholder="Email"
              {...register('email')}
            />
            {/* <InputError
            fallback="  Type your email"
            errorMessage={errors?.email?.message ?? ''}
          /> */}
            <input
              className="p-3 font-medium text-sm outline-1 outline-zinc-400 flex items-center bg-white rounded-lg border border-gray-300 col-span-12"
              type="password"
              id="password"
              placeholder="Password"
              {...register('password')}
            />
            {/* <InputError
            fallback="  Type your password"
            errorMessage={errors?.password?.message ?? ''}
          /> */}
            <button
              className="mt-8 p-2 font-semibold text-md outline-1 bg-white text-orange-500 rounded-lg ring ring-orange-500 col-span-6"
              onClick={() => navigate('/')}
            >
              Go back
            </button>
            <button
              className="mt-8 p-2 font-semibold text-md outline-1 bg-orange-500 ring ring-orange-500 text-white rounded-lg col-span-6"
              disabled={isSubmitting}
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
