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
import { Check, Prohibit, Trash } from 'phosphor-react'
import serviceRequest from '../../../assets/service-request.svg'

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
    <div className="flex flex-col items-start w-8/12 mx-auto">
      <div className="flex flex-col items-start mt-8 space-y-4 p-4">
        <h1 className="text-2xl text-orange-500 font-bold">
          My service requests
        </h1>
        <p className="text-md text-gray-500 font-semibold">
          Here you can find all your service requests. You can accept, refuse
          and delete them
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
                <img className="h-32 w-32" src={serviceRequest} alt="" />
              </picture>
              <div className="flex flex-grow w-full space-x-6 p-6 rounded-tr-lg rounded-br-lg border-t border-r border-gray-100">
                <div className="absolute right-6">
                  <ul className="flex space-x-4">
                    <li
                      className="flex justify-start items-center p-2 rounded-lg ring ring-orange-500 bg-orange-500 text-white font-semibold cursor-pointer"
                      onClick={() => handleAcceptServiceRequest(service)}
                    >
                      Accept service
                      <Check size={22} className="ml-2" />
                    </li>
                    <li
                      className="flex justify-start items-center p-2 rounded-lg bg-white text-orange-500 ring ring-orange-500 font-semibold cursor-pointer"
                      onClick={() => handleRefuseServiceRequest(service)}
                    >
                      Refuse service
                      <Prohibit size={22} className="ml-2" />
                    </li>
                    <li
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 bg-opacity-20 text-orange-500 font-bold cursor-pointer"
                      onClick={() => handleDeleteServiceRequest(service)}
                    >
                      <Trash size={22} />
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
    </div>
  )
}
