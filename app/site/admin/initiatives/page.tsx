import { InitiativesAdminEditor } from "@/components/initiatives-admin-editor"
import { InitiativesAdminLogin } from "@/components/initiatives-admin-login"
import { SubpageLayout } from "@/components/subpage-layout"
import { getAdminSession } from "@/lib/initiatives-admin-auth"
import { loadInitiativeRecords } from "@/lib/initiatives-store"

export const dynamic = "force-dynamic"

export default async function InitiativesAdminPage() {
  const session = await getAdminSession()
  if (!session) {
    return (
      <SubpageLayout surface="light">
        <div className="flex min-h-dvh justify-center px-4 pb-24 pt-24">
          <InitiativesAdminLogin />
        </div>
      </SubpageLayout>
    )
  }

  const records = await loadInitiativeRecords()
  return (
    <SubpageLayout surface="light">
      <InitiativesAdminEditor initial={records} username={session.user} />
    </SubpageLayout>
  )
}
