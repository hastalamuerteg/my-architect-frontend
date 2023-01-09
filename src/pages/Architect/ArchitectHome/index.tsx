import { useCallback, useEffect, useState } from 'react'
import { IServiceRequest } from '../../../types'
import { useAuth } from '../../../navigation/contexts/AuthContextProvider'
import {
  acceptServiceRequest,
  deleteServiceRequest,
  getServiceRequests,
  refuseServiceRequest,
} from '../../../services/base'
import empty from '../../../assets/empty.svg'
import { Trash } from 'phosphor-react'

export const ArchitectHome = () => {
  const { authUser } = useAuth()

  const [serviceRequests, setServiceRequests] = useState<
    IServiceRequest[] | undefined
  >(undefined)

  const getServiceRequestList = useCallback(async () => {
    if (authUser?.isArchitect) {
      try {
        const response = await getServiceRequests('architect', authUser.id)
        if (response.success) {
          setServiceRequests(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [authUser])

  const handleAcceptServiceRequest = async (service: IServiceRequest) => {
    if (authUser?.isArchitect && service) {
      try {
        await acceptServiceRequest(service.id, authUser?.id)
        getServiceRequestList()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleRefuseServiceRequest = async (service: IServiceRequest) => {
    if (authUser?.isArchitect && service) {
      try {
        await refuseServiceRequest(service.id, authUser?.id)
        getServiceRequestList()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteServiceRequest = async (service: IServiceRequest) => {
    if (service) {
      try {
        const response = await deleteServiceRequest(service.id)

        if (response.success) {
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
    <div className="flex flex-col items-center w-10/12 mx-auto">
      <h1 className="text-5xl text-orange-500 font-bold my-12">
        My service requests
      </h1>
      <p className="text-lg text-gray-500 font-semibold">
        Here you can find all your service requests. You can accept, refuse and
        delete them
      </p>
      <div className="flex flex-col items-start w-full p-4 space-y-10 my-8">
        {serviceRequests?.length ? (
          serviceRequests?.map((service) => (
            <div
              className="flex rounded-lg bg-white border-2 border-orange-400 shadow-lg space-x-6 p-6 m-2 w-full relative"
              key={service.id}
            >
              <div className="absolute right-6">
                <ul className="flex space-x-2">
                  <li
                    className="p-2 rounded-full bg-green-500 text-white font-semibold cursor-pointer"
                    onClick={() => handleAcceptServiceRequest(service)}
                  >
                    Accept service
                  </li>
                  <li
                    className="p-2 rounded-full bg-orange-500 text-white font-semibold cursor-pointer"
                    onClick={() => handleRefuseServiceRequest(service)}
                  >
                    Refuse service
                  </li>
                  <li
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white font-semibold cursor-pointer"
                    onClick={() => handleDeleteServiceRequest(service)}
                  >
                    <Trash size={20} />
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-start text-gray-600">
                <h2 className="text-3xl font-bold mb-4">{`${service.title}`}</h2>
                <p className="flex space-x-2">
                  <strong>Description:</strong>
                  <span>{service.description}</span>
                </p>
                <p className="flex space-x-2">
                  <strong>Status:</strong>
                  {service.requested && (
                    <span className="text-orange-500 font-semibold">
                      Solicitação de serviço enviada
                    </span>
                  )}
                  {service.accepted && (
                    <span className="text-green-500 font-semibold">
                      Solicitação de serviço aceita
                    </span>
                  )}
                  {service.refused && (
                    <span className="text-red-500 font-semibold">
                      Solicitação de serviço recusada
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-full space-y-6">
            <h3 className="text-2xl font-semibold text-orange-500 text-center w-full">
              You do not have any service requests yet
            </h3>
            <img src={empty} alt="" className="w-60 h-w-60" />
          </div>
        )}
      </div>
    </div>
  )
}
