import type { NextApiRequest, NextApiResponse } from 'next'
import {spawnSync} from "child_process";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const rawDeps = spawnSync('php', ['-r', req.body])

    res.status(200).json({ message: rawDeps.stdout.toString() })
}