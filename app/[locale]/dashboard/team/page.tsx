// MyTeamPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteUserProfile } from '@/app/actions/profiles/delete-user-profile'
import { getTeamProfiles } from '@/app/actions/profiles/get-team-profiles'
import { Section } from '@/components/layout'
import { RoleChip, StatusChip } from '@/components/shared'
import {
  CreateUserDialog,
  DeleteUserDialog,
  EditUserDialog,
} from '@/components/team'
import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Loader,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

interface Profile {
  id: string
  name: string
  email: string | null
  role: string
  has_timetracker: boolean
  created_at: string
  updated_at: string
}

const MyTeamPage: React.FC = () => {
  const t = useTranslations('Team')
  const router = useRouter()
  const { locale } = useParams() as { locale: string }

  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  // State holds the profile object for deletion/editing
  const [deleteUser, setDeleteUser] = useState<Profile | null>(null)
  const [editUser, setEditUser] = useState<Profile | null>(null)

  // Load profiles from server
  const loadProfiles = async () => {
    setLoading(true)
    try {
      const data = await getTeamProfiles()
      setProfiles(data)
    } catch (err) {
      console.error(err)
      toast.error(t('teamPage.loadError'))
    } finally {
      setLoading(false)
    }
  }

  // Delete user handler (centralized toast logic)
  const handleDelete = async (id: string) => {
    // Get the name from the state object or use a fallback translation
    const userName =
      deleteUser?.name || t('userActions.delete.defaultUserNameFallback')

    try {
      await deleteUserProfile(id)
      setProfiles((prev) => prev.filter((p) => p.id !== id))

      // Success toast uses the name
      toast.success(t('userActions.delete.success', { name: userName }))
    } catch (err) {
      console.error(err)
      // Error toast
      toast.error(t('userActions.delete.error'))
    } finally {
      // Clear the state after action is complete
      setDeleteUser(null)
    }
  }

  // Handler for CreateUserDialog success
  const handleCreateSuccess = (email: string) => {
    toast.success(t('userActions.create.success'))
    loadProfiles()
  }

  // Handler for CreateUserDialog error
  const handleCreateError = (errorMessage: string) => {
    toast.error(errorMessage)
  }

  // Handler for EditUserDialog success
  const handleEditSuccess = () => {
    toast.success(t('userActions.edit.success'))
    loadProfiles()
  }

  // Handler for EditUserDialog error
  const handleEditError = (errorMessage: string) => {
    toast.error(errorMessage)
  }

  useEffect(() => {
    loadProfiles()
  }, [])

  return (
    <Section title={t('teamPage.title')}>
      <Card
        className="mb-8"
        size="lg"
        title={t('teamPage.employeesList')}
        headerSlot={
          <CreateUserDialog
            t={t}
            onSuccess={handleCreateSuccess}
            onError={handleCreateError}
          />
        }
      >
        {loading ? (
          // Show the loader while profiles are being fetched
          <div className="flex items-center justify-center py-16">
            <Loader className="text-primary" size="lg" loading={loading} />
          </div>
        ) : (
          <Table>
            <TableCaption>{t('teamPage.tableCaption')}</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>{t('table.id')}</TableHead>
                <TableHead>{t('table.name')}</TableHead>
                <TableHead>{t('table.email')}</TableHead>
                <TableHead>{t('table.role')}</TableHead>
                <TableHead>{t('table.timetracker')}</TableHead>
                <TableHead>{t('table.created')}</TableHead>
                <TableHead>{t('table.updated')}</TableHead>
                <TableHead className="w-12 text-right">
                  <span className="sr-only">{t('table.actions')}</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {profiles.map((user) => (
                <TableRow
                  key={user.id}
                  className="group hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors"
                >
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>

                  <TableCell
                    className="cursor-pointer font-medium"
                    onClick={() =>
                      router.push(`/${locale}/dashboard/team/${user.id}`)
                    }
                  >
                    {user.name}
                  </TableCell>

                  <TableCell>{user.email || '-'}</TableCell>

                  <TableCell>
                    <RoleChip role={user.role} t={t} />
                  </TableCell>

                  <TableCell>
                    <StatusChip
                      status={user.has_timetracker ? 'active' : 'inactive'}
                      label="Timetracker"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(user.created_at).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    {new Date(user.updated_at).toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => setEditUser(user)}>
                          <Edit className="h-4 w-4" />
                          {t('userActions.edit.label')}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setDeleteUser(user)} // Pass the whole object
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          {t('userActions.delete.label')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Edit User Dialog */}
      {editUser && (
        <EditUserDialog
          t={t}
          user={editUser}
          open={!!editUser}
          onClose={() => setEditUser(null)}
          onSuccess={handleEditSuccess}
          onError={handleEditError}
        />
      )}

      {/* Delete User Dialog */}
      {deleteUser && (
        <DeleteUserDialog
          t={t}
          userId={deleteUser.id}
          userName={deleteUser.name} // Pass name for better confirmation UX
          open={!!deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={handleDelete}
        />
      )}
    </Section>
  )
}

export default MyTeamPage
