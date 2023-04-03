// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {NodeManager} from '@/nodes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'GET') {
         try {
        let {author_id, post_id, page, size} = req.query;
        
        if (page && size) {
            let pge = parseInt(page as unknown as string);
            let sza = parseInt(size as unknown as string);
            const results = await NodeManager.getComments(author_id as string, post_id as string, pge, sza);
            return res.status(200).json(results);
        }
        
        const results = await NodeManager.getComments(author_id as string, post_id as string);

        return res.status(200).json(results);
            
        }
        catch (e) {
            
            return res.status(500).json(false);
        }
    }

    if (req.method === 'POST') {
            try {
            let {author_id, post_id} = req.query;
            
            const results = await NodeManager.createComment(author_id as string, post_id as string, req.body);
            
            return res.status(500).json(results);
                
            }
            catch (e) {
                console.error(e);
                return res.status(200).json(false);
            }
    }


    
}
  