const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((response) => {
      res.render("drones/list.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create()
    .then((response) => {
      res.render("drones/create-form.hbs", { response });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
    const name = req.body.name;
    const propellers = req.body.propellers;
    const maxSpeed = req.body.maxSpeed;
    Drone.create({
      name: name,
      propellers: propellers,
      maxSpeed: maxSpeed
    })
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      res.redirect("/drones/create");
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {id} = req.params

  Drone.findById(id)
    .then((response) => {
      res.render("drones/update-form.hbs", response);
    })
    .catch(() => {
      res.redirect("/drones/create");
    });
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
    const name = req.body.name;
    const propellers = req.body.propellers;
    const maxSpeed = req.body.maxSpeed;
    const {id} = req.params
    Drone
      .findByIdAndUpdate(id, {name, propellers, maxSpeed})
      .then(() => {
        res.redirect("/drones")
      })
      .catch(() => {
       res.redirect("/drones/create");
      });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id} = req.params
  Drone
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect("/drones")
    })
    .catch(() => {
      res.redirect("/drones/:id/delete")
    })
});

module.exports = router;
