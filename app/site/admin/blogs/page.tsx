import { BlogsAdminShell } from "@/components/blogs-admin-shell"
import { InitiativesAdminLogin } from "@/components/initiatives-admin-login"
import { SubpageLayout } from "@/components/subpage-layout"
import { getAdminSession } from "@/lib/initiatives-admin-auth"
import { loadBlogRecords } from "@/lib/blogs-store"

export const dynamic = "force-dynamic"

export default async function BlogsAdminPage() {
  const session = await getAdminSession()
  if (!session) {
    return (
      <SubpageLayout surface="light">
        <div className="flex min-h-dvh justify-center px-4 pb-24 pt-24">
          <InitiativesAdminLogin title="Blog admin" />
        </div>
      </SubpageLayout>
    )
  }

  const records = await loadBlogRecords()
  return (
    <SubpageLayout surface="light">
      <BlogsAdminShell initial={records} username={session.user} />
    </SubpageLayout>
  )
}
