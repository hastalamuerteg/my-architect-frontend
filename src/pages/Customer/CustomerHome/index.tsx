import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../navigation/contexts/AuthContextProvider'
import { createNewServiceRequest, getArchitects } from '../../../services/base'
import { IArchitect } from '../../../types'
import maleAvatar from '../../../assets/male.svg'
import femaleAvatar from '../../../assets/female.svg'
import { ArrowRight } from 'phosphor-react'
import { Modal } from '../../../components/Modal'

export const CustomerHome = () => {
  const { authUser } = useAuth()
  const [architects, setArchitects] = useState<IArchitect[] | undefined>(
    undefined,
  )
  const [createServiceRequestModalOpen, setCreateServiceRequestModalOpen] =
    useState<boolean>(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [architect, setArchitect] = useState<IArchitect | undefined>(undefined)

  const getArchitectsList = useCallback(async () => {
    if (authUser) {
      try {
        const response = await getArchitects(authUser.id)
        if (response.success) {
          setArchitects(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [authUser])

  const handleGoToServiceRequestCreation = (architect: IArchitect) => {
    setArchitect(architect)
    setCreateServiceRequestModalOpen(true)
  }

  const cleanOutForm = () => {
    setCreateServiceRequestModalOpen(false)
    setTitle('')
    setDescription('')
    setArchitect(undefined)
  }

  const handleCreateServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (authUser && architect) {
      const payload = {
        title,
        description,
        customerId: authUser.id,
        architectId: architect?.id,
      }
      try {
        const response = await createNewServiceRequest(payload)
        if (response.success) {
          cleanOutForm()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getArchitectsList()
  }, [getArchitectsList])

  return (
    <div className="flex flex-col items-center w-10/12 mx-auto">
      <h1 className="text-5xl text-orange-500 font-bold my-12">
        Available architects
      </h1>
      <p className="text-lg text-gray-500 font-semibold">
        Here you can find all available architects. You can send them service
        requests and wait for them to see and reply back.
      </p>
      <div className="flex flex-col items-start w-full p-4 space-y-10 my-8">
        {architects?.map((architect) => (
          <div
            className="flex rounded-lg bg-white border-2 border-orange-400 shadow-lg space-x-6 p-6 m-2 w-full relative"
            key={architect.id}
          >
            <div className="absolute right-6">
              <p
                className="flex items-center text-orange-500 font-bold cursor-pointer"
                onClick={() => handleGoToServiceRequestCreation(architect)}
              >
                Send service request
                <ArrowRight />
              </p>
            </div>
            <img
              className="h-32 w-32 object-cover rounded-full"
              src={`${architect.gender === 'male' ? maleAvatar : femaleAvatar}`}
              alt=""
            />
            <div className="flex flex-col justify-start text-gray-600">
              <h2 className="text-3xl font-bold mb-4">{`${architect.firstName} ${architect.lastName}`}</h2>
              <p className="flex space-x-2">
                <strong>Gender:</strong>
                <span>{architect.gender}</span>
              </p>
              <p className="flex space-x-2">
                <strong>Phone:</strong>
                <span>{architect.phone}</span>
              </p>
              <p className="flex space-x-2">
                <strong>Email:</strong>
                <span>{architect.email}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={createServiceRequestModalOpen}
        onClose={() => setCreateServiceRequestModalOpen(false)}
      >
        <h3 className="text-2xl font-semibold text-orange-500 text-center">
          Create a service request
        </h3>
        <form
          className="mt-8 space-y-6 w-full"
          onSubmit={handleCreateServiceRequest}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="title"
              required
              className="appearance-none relative block w-full my-4 px-3 py-3 border-2 rounded-lg border-orange-500 placeholder-orange-700 focus:outline-none focus:z-10 sm:text-sm"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="description"
                required
                className="appearance-none relative block w-full my-4 px-3 py-3 border-2 rounded-lg border-orange-500 placeholder-orange-700 focus:outline-none focus:z-10 sm:text-sm"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex items-center justify-center py-4 px-4 text-sm font-bold rounded-md text-white bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Create service request
              <ArrowRight className="ml-4" />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
