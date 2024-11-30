import { Utility } from '@/core/helpers/utility'
import { Organization, OrganizationRole, User } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Api } from '../../trpc'

type OrganizationWithRoles = Organization & { roles: OrganizationRole[] }
export interface OrganizationContextType {
  organization: OrganizationWithRoles
  organizationRoles: OrganizationRole[]
  organizations: Organization[]
  isLoadingOrganization: boolean
  checkOrganizationRole(name: string): boolean
  refetchOrganization(): void
  refetchOrganizations(): void
}

export const useOrganizationContext = (options: {
  user: User
}): OrganizationContextType => {
  const params = useParams<{ organizationId?: string }>()

  const keyLocalStorage = `organizationId-${options.user?.id}`

  const [isLoading, setLoading] = useState<boolean>(false)
  const [organization, setOrganization] = useState<OrganizationWithRoles>()

  const canFetchOrganizations = Utility.isDefined(options.user?.id)

  const {
    data: organizations,
    isLoading: isLoadingOrganizations,
    refetch: refetchOrganizations,
  } = Api.organization.findMany.useQuery(
    {
      where: { roles: { some: { userId: options.user?.id } } },
      orderBy: { name: 'asc' },
    },
    { enabled: Utility.isDefined(options.user?.id), initialData: [] },
  )

  const organizationIdSaved =
    typeof window !== 'undefined' ? localStorage.getItem(keyLocalStorage) : null

  const organizationId =
    params.organizationId ??
    organization?.id ??
    organizationIdSaved ??
    organizations[0]?.id

  const canFetchOrganization =
    Utility.isDefined(organizationId) && Utility.isDefined(options.user)

  const { refetch: refetchOrganization, isLoading: isLoadingOrganization } =
    Api.organization.findUnique.useQuery(
      {
        where: { id: organizationId },
        include: { roles: { where: { userId: options.user?.id } } },
      },
      {
        enabled:
          Utility.isDefined(organizationId) &&
          organizationId !== organization?.id &&
          Utility.isDefined(options.user),

        onSuccess(organization) {
          if (!organization) {
            window.location.replace('/home')
            localStorage.removeItem(keyLocalStorage)
          } else {
            setOrganization(organization)
            localStorage.setItem(keyLocalStorage, organization.id)
          }
          setLoading(false)
        },
        onError() {
          setOrganization(null)
          localStorage.removeItem(keyLocalStorage)
          setLoading(false)
        },
      },
    )

  const organizationRoles = organization?.roles ?? []

  const checkOrganizationRole = (roleName: string) => {
    return !!organizationRoles?.find(role => role.name === roleName)
  }

  const handleRefreshOrganizations = async () => {
    if (canFetchOrganizations) {
      await refetchOrganizations()
    }
  }

  const handleRefreshOrganization = async () => {
    if (canFetchOrganization) {
      setLoading(true)
      await refetchOrganization()
    }
  }

  return {
    organization,
    organizationRoles,
    organizations,
    refetchOrganization: handleRefreshOrganization,
    refetchOrganizations: handleRefreshOrganizations,
    checkOrganizationRole,
    isLoadingOrganization:
      isLoadingOrganizations || isLoadingOrganization || isLoading,
  }
}
