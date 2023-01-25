import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../navigation/contexts/AuthContextProvider'
import { createNewServiceRequest, getArchitects } from '../../../services/base'
import { IArchitect } from '../../../types'
import maleAvatar from '../../../assets/male.svg'
import femaleAvatar from '../../../assets/female.svg'
import { PaperPlaneTilt } from 'phosphor-react'
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
    <div className="flex flex-col items-start w-8/12 mx-auto">
      <div className="flex flex-col items-start mt-8 space-y-4 p-4">
        <h1 className="text-2xl text-orange-500 font-bold">
          Available architects
        </h1>
        <p className="text-md text-gray-500 font-semibold">
          Here you can find all available architects. You can send them service
          requests and wait for them to see and reply back.
        </p>
      </div>
      <div className="flex flex-col items-center w-full p-4 space-y-10 my-8">
        {architects?.map((architect) => (
          <div
            key={architect.id}
            className="flex w-full relative bg-white shadow-md rounded-lg"
          >
            <picture className="bg-orange-500 bg-opacity-20 w-52 rounded-tl-lg rounded-bl-lg p-8 flex justify-center items-center">
              <img
                className="h-32 w-32"
                src={`${
                  architect.gender === 'male' ? maleAvatar : femaleAvatar
                }`}
                alt=""
              />
            </picture>
            <div className="flex flex-grow w-full space-x-6 p-6 rounded-tr-lg rounded-br-lg border-t border-r border-gray-100">
              <div className="absolute right-6">
                <p
                  className="flex items-center text-orange-500 font-bold cursor-pointer"
                  onClick={() => handleGoToServiceRequestCreation(architect)}
                >
                  Send service request
                  <PaperPlaneTilt size={22} className="ml-4" />
                </p>
              </div>

              <div className="flex flex-col justify-start text-gray-600">
                <h2 className="text-2xl font-bold mb-2">{`${architect.firstName
                  .charAt(0)
                  .toLocaleUpperCase()}${architect.firstName.slice(1)} ${
                  architect.lastName
                }`}</h2>
                <p className="flex space-x-2 text-lg text-orange-500">
                  <span>{architect.gender}</span>
                </p>
                <p className="flex space-x-2">
                  <span>{architect.phone}</span>
                </p>
                <p className="flex space-x-2">
                  <span>{architect.email}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={createServiceRequestModalOpen}
        onClose={() => setCreateServiceRequestModalOpen(false)}
      >
        <div className="flex flex-col justify-center items-center bg-orange-500 bg-opacity-20 p-14 rounded-lg">
          <h3 className="text-2xl font-semibold text-orange-500 text-center">
            Create a service request
          </h3>
          <form
            className="mt-8 space-y-6 w-full"
            onSubmit={handleCreateServiceRequest}
          >
            <div className="rounded-lg shadow-sm">
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
                className="group relative w-full flex items-center justify-center py-4 px-4 text-sm font-bold rounded-lg text-white bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Create service request
                <PaperPlaneTilt size={22} className="ml-4" />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
