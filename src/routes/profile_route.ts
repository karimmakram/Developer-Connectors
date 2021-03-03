import { Router } from 'express'
import Auth from '../middleware/auth'
import profile from '../controllers/Cn_profile'
import { check } from 'express-validator'
export const profileRoute = Router()

profileRoute.get('/profile/me', Auth, profile.getProfile)

//add and update
profileRoute.post('/profile', Auth, [
    check('skills', 'skills is required').not().isEmpty(),
    check('status', 'status is required').not().isEmpty()
], profile.addProfile)

profileRoute.get('/profile', profile.getAllprofile)
profileRoute.get('/profile/:userid', profile.getprofilebyid)
profileRoute.delete('/profile', Auth, profile.deleteprofile)

/// experience 

profileRoute.put('/profile/experience', Auth, [check('company', 'company is required').not().isEmpty(),
check('title', 'title is required').not().isEmpty(),
check('location', 'location is required').not().isEmpty(),
check('from', 'from is required').not().isEmpty()],
    profile.addExperience)

profileRoute.delete('/profile/experience/:id', Auth, profile.deleteExperience)

/// education
profileRoute.put('/profile/education', Auth, [check('school', 'school is required').not().isEmpty(),
check('degree', 'degree is required').not().isEmpty(),
check('filedofstudy', 'filedofstudy is required').not().isEmpty(),
check('from', 'from is required').not().isEmpty()],
    profile.addEducation)

profileRoute.delete('/profile/education/:id', Auth, profile.deleteEducation)


/////// git hub api

profileRoute.get('/profile/github/:username', profile.githubRepo)