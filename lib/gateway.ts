import { NextApiRequest, NextApiResponse } from 'next'

import { getJWTPayload } from 'lib/jwt'
import prisma from 'lib/prisma'

export async function gateJWT(req: NextApiRequest, res: NextApiResponse) {
	const { cookies } = req

	if (!cookies) {
		return res.status(400).json({
			Success: false,
			Message: 'Invalid request...',
		})
	}

	const { AJWT } = cookies

	if (!AJWT) {
		return res.status(400).json({
			Success: false,
			Message: 'Invalid request...',
		})
	}

	return await getJWTPayload(AJWT)
}

export async function gateUser(req: NextApiRequest, res: NextApiResponse) {
	const decoded = await gateJWT(req, res)

	const user = await prisma.user.findUnique({
		where: {
			//@ts-ignore
			id: decoded.id.toString(),
		},
		include: {
			referralsProvided: true,
			referralsConsumed: true,
			blogPosts: true,
		},
	})

	if (!user) {
		return res.status(400).json({
			Success: false,
			Message: 'Invalid request...',
		})
	}

	return user
}

export async function gateAdmin(req: NextApiRequest, res: NextApiResponse) {
	const user = await gateUser(req, res)

	if (!user || !user.isAdmin) {
		return res.status(400).json({
			Success: false,
			Message: 'Invalid request...',
		})
	}

	return user
}
