import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../../navigation/contexts/AuthContextProvider'
import { IServiceRequest } from '../../../types'
import {
  deleteServiceRequest,
  editServiceRequest,
  getServiceRequests,
} from '../../../services/base'
import { ArrowRight, Pen, Trash, Warning, X } from 'phosphor-react'
import { Modal } from '../../../components/Modal'
import empty from '../../../assets/empty.svg'
import serviceRequestImg from '../../../assets/service-request.svg'

export const CustomerServiceRequests = () => {
  const { authUser } = useAuth()
  const [serviceRequests, setServiceRequests] = useState<
    IServiceRequest[] | undefined
  >(undefined)
  const [serviceRequest, setServiceRequest] = useState<
    IServiceRequest | undefined
  >(undefined)
  const [editSerViceRequestModal, setEditSerViceRequestModal] =
    useState<boolean>(false)
  const [deleteSerViceRequestModal, setDeleteSerViceRequestModal] =
    useState<boolean>(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const getServiceRequestList = useCallback(async () => {
    if (authUser?.isCustomer) {
      try {
        const response = await getServiceRequests('customer', authUser.id)
        if (response.success) {
          setServiceRequests(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [authUser])

  const cleanOutForm = () => {
    setEditSerViceRequestModal(false)
    setTitle('')
    setDescription('')
  }

  const handleGoToServiceRequestEdition = (serviceRequest: IServiceRequest) => {
    setTitle(serviceRequest.title)
    setDescription(serviceRequest.description)
    setServiceRequest(serviceRequest)
    setEditSerViceRequestModal(true)
  }

  const handleGoToServiceRequestDelete = (serviceRequest: IServiceRequest) => {
    setServiceRequest(serviceRequest)
    setDeleteSerViceRequestModal(true)
  }

  const handleEditServiceRequests = async (e: React.FormEvent) => {
    e.preventDefault()
    if (serviceRequest && authUser && title && description) {
      try {
        const payload = {
          title,
          description,
          customerId: authUser.id,
        }
        const response = await editServiceRequest(serviceRequest.id, payload)

        if (response.success) {
          cleanOutForm()
          getServiceRequestList()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteServiceRequest = async () => {
    if (serviceRequest) {
      try {
        const response = await deleteServiceRequest(serviceRequest.id)

        if (response.success) {
          setDeleteSerViceRequestModal(false)
          getServiceRequestList()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getServiceRequestList()
  }, [getServiceRequestList])

  return (
    <div className="flex flex-col items-start w-8/12 mx-auto">
      <div className="flex flex-col items-start mt-8 space-y-4 p-4">
        <h1 className="text-2xl text-orange-500 font-bold">
          My service requests
        </h1>
        <p className="text-md text-gray-500 font-semibold">
          Here you can find all your service requests. You can edit and delete
          them.
        </p>
      </div>
      <div className="flex flex-col items-center w-full p-4 space-y-10 my-8">
        {serviceRequests?.length ? (
          serviceRequests?.map((service) => (
            <div
              key={service.id}
              className="flex w-full relative bg-white shadow-md rounded-lg"
            >
              <picture className="bg-orange-500 bg-opacity-20 w-52 rounded-tl-lg rounded-bl-lg p-8 flex justify-center items-center">
                <img className="h-32 w-32" src={serviceRequestImg} alt="" />
              </picture>
              <div className="flex flex-grow w-full space-x-6 p-6 rounded-tr-lg rounded-br-lg border-t border-r border-gray-100">
                <div className="absolute right-6">
                  <ul className="flex space-x-2">
                    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 bg-opacity-20 text-orange-500 font-bold cursor-pointer">
                      <Pen
                        size={22}
                        onClick={() => handleGoToServiceRequestEdition(service)}
                      />
                    </li>
                    <li className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 bg-opacity-20 text-orange-500 font-bold cursor-pointer">
                      <Trash
                        size={22}
                        onClick={() => handleGoToServiceRequestDelete(service)}
                      />
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col justify-start text-gray-600">
                  <h2 className="text-3xl font-bold mb-4">{`${service.title}`}</h2>
                  <p className="flex space-x-2 text-orange-500">
                    <span>{service.description}</span>
                  </p>
                  <p className="flex space-x-2">
                    {service.requested && (
                      <span className="text-orange-700 text-sm bg-orange-500 bg-opacity-20 font-bold py-2 px-4 rounded-full mt-4">
                        Solicitação de serviço enviada
                      </span>
                    )}
                    {service.accepted && (
                      <span className="text-green-700 text-sm bg-green-500 bg-opacity-20 font-bold py-2 px-4 rounded-full mt-4">
                        Solicitação de serviço aceita
                      </span>
                    )}
                    {service.refused && (
                      <span className="text-red-700 text-sm bg-red-500 bg-opacity-20 font-bold py-2 px-4 rounded-full mt-4">
                        Solicitação de serviço recusada
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-full space-y-6 bg-gray-300 bg-opacity-30 p-14 rounded-lg">
            <img src={empty} alt="" className="w-60 h-60" />
            <h3 className="text-base font-semibold text-orange-500 text-center w-full">
              You do not have any service requests yet
            </h3>
          </div>
        )}
      </div>
      <Modal
        open={editSerViceRequestModal}
        onClose={() => setEditSerViceRequestModal(false)}
      >
        <div className="flex flex-col justify-center items-center bg-orange-500 bg-opacity-20 p-14 rounded-lg">
          <h3 className="text-2xl font-semibold text-orange-500 text-center">
            Edit service request
          </h3>
          <form
            className="mt-8 space-y-6 w-full"
            onSubmit={handleEditServiceRequests}
          >
            <div className="rounded-lg shadow-sm -space-y-px">
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
                value={title}
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
                  value={description}
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
                Edit service request
                <ArrowRight size={22} className="ml-4" />
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        open={deleteSerViceRequestModal}
        onClose={() => setDeleteSerViceRequestModal(false)}
      >
        <div className="flex flex-col justify-center items-center bg-orange-500 bg-opacity-20 h-3/4 rounded-lg">
          <Warning size={64} className="text-orange-500 my-4" />
          <h3 className="text-2xl font-semibold text-orange-500 text-center">
            Are you sure you want to delete this service request
          </h3>
          <div className="flex justify-between space-x-4 mt-8">
            <button
              className="flex items-center p-2 rounded-lg bg-white text-orange-500 ring ring-orange-500 font-semibold"
              onClick={() => setDeleteSerViceRequestModal(false)}
            >
              Cancel <X size={22} className="ml-2" />
            </button>
            <button
              className="flex items-center p-2 rounded-lg ring ring-orange-500 bg-orange-500 text-white font-semibold"
              onClick={handleDeleteServiceRequest}
            >
              Delete <Trash size={22} className="ml-2" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
