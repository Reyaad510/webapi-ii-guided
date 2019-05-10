
  const express = require('express');
  
  const Hubs = require('./hubs-model.js');

  const router = express.Router();


   // /api/hubs

  router.get('/', async (req, res) => {
    try {
      const hubs = await Hubs.find(req.query);
      res.status(200).json(hubs);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    }
  });
  
  
  // Async await is javascript specific(not node, express, backend thing etc) but helps stop Promise hell
  

  router.get('/:id', async (req, res) => {
    try {
      const hub = await Hubs.findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  
  router.post('/', async (req, res) => {
    const newHub = req.body;

    if(newHub.name) {
        try {
            const hub = await Hubs.add(req.body);
            res.status(201).json(hub);
          } catch (error) {
            // log error to database
            console.log(error);
            res.status(500).json({
              message: 'Error adding the hub',
            });
          }
    } else {
        res.status(400).json({ err: 'name property missing' })
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const count = await Hubs.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const hub = await Hubs.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });
  
  // add an endpoint that returns all the messages for a hub
     router.get('/:id/messages', async (req, res) => {
         const { id } = req.params;

         try {
           const messages =  await Hubs.findHubMessages(id);

           if(messages.length) {
               res.json(messages);
           } else {
               res.status(404).json({ err: 'No messages for this hub' })
           }
         } catch(err) {
            res.status(500).json({ err })
         }

     })

  // add an endpoint for adding new message to a hub
  // message should have text and a hubId

    router.post('/:id/messages', async(req, res) => {
        const messageInfo = {...req.body, hub_id: req.params.id}

        try {
          const saved =  await Hubs.addMessage(messageInfo);
          res.status(201).json(saved);
        } catch(err) {
            res.status(500).json({ 
                message: 'Failed to save message',
                err
             });
        }  
    });


    // messages should have text and sender and a hub_id
  

  module.exports = router;