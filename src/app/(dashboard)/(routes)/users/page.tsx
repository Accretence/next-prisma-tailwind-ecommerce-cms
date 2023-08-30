import { format } from 'date-fns'

import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'

import { UsersClient } from './components/client'
import { UserColumn } from './components/columns'

const ProductsPage = async () => {
   const users = await prisma.user.findMany({
      orderBy: {
         updatedAt: 'desc',
      },
   })

   const formattedUsers: UserColumn[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6">
            <UsersClient data={formattedUsers} />
         </div>
      </div>
   )
}

export default ProductsPage
