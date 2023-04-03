// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {NodeManager} from '@/nodes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
            try {
            let {author_id, foreign_author_id} = req.query;
            const results = await NodeManager.checkFollowerStatus(author_id as string, foreign_author_id as string);
    
            return res.status(200).json(results);
                
            }
            catch (e) {
                console.error(e);
                return res.status(200).json(false);
            }
    }

    if (req.method === 'PUT') {
         try {
        let {author_id, foreign_author_id} = req.query;
        const results = await NodeManager.addFollower(author_id as string, foreign_author_id as string);

        return res.status(200).json(results);
            
        }
        catch (e) {
            console.error(e);
            return res.status(500).json(false);
        }
    }

    if (req.method === 'DELETE') {
            try {
                 
            let {author_id, foreign_author_id} = req.query;
            const results = await NodeManager.removeFollower(author_id as string, foreign_author_id as string);
           
            return res.status(200).json(results);
                
            }
            catch (e) {
                console.error(e);
                return res.status(500).json(false);
            }
    }
}