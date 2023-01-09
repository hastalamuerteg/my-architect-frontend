import { createNewArchitect, createNewCostumer } from '../../services/base'
import { useNavigate } from 'react-router-dom'
import { ICreateNewArchitect, ICreateNewCostumer, IProfile } from '../../types'

export const useCreateNewUser = () => {
  const navigate = useNavigate()

  const createCustomer = async (payload: ICreateNewCostumer) => {
    const response = await createNewCostumer(payload)
    if (response.success) {
      navigate('/app/customer')
    }
  }

  const createArchitect = async (payload: ICreateNewArchitect) => {
    const response = await createNewArchitect(payload)
    if (response.success) {
      navigate('/app/architect')
    }
  }

  const create = async (
    profile: IProfile,
    data: ICreateNewCostumer | ICreateNewArchitect,
  ) => {
    try {
      if (profile === 'customer') createCustomer(data)
      if (profile === 'architect') createArchitect(data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    create,
  }
}
