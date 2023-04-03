// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {NodeManager} from '@/nodes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
        let {author_id} = req.query;
        try {
            const results = await NodeManager.getInbox(author_id as string);
            return res.status(200).json(results);
        }
        catch (e) {
            console.error(e);
            return res.status(500).json(null);
        }
    }
    else if (req.method === 'POST') {
        let {author_id} = req.query;
        try {
            
            const results = await NodeManager.sendToInbox(author_id as string, req.body);
            return res.status(200).json(results);
        }
        catch (e) {
            console.error(e);
            return res.status(500).json(null);
        }
    }

    else if (req.method === 'DELETE') {
        let {author_id} = req.query;
        try {
            const results = await NodeManager.clearInbox(author_id as string);
            return res.status(200).json(results);
        }
        catch (e) {
            console.error(e);
            return res.status(500).json(null);
        }
    }
}

  