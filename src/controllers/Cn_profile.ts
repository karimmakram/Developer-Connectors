import { Request, Response } from 'express'
import profileModel from '../Models/profile'
import { Education } from '../Models/classes/education'
import { Experience } from '../Models/classes/experience'
import { Social } from '../Models/classes/social'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'
import config from 'config'
import { userModel } from '../Models/users'
import request from 'request'
import { postModel } from '../Models/posts'
class profileController {
    addProfile = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send(errors.array())
            }
            const { company, website, location, status, skills, bio, githubUsername }:
                { company: string, website: string, location: string, status: string, skills: string, bio: string, githubUsername: string } = req.body
            const { social }:
                { social: Social } = req.body

            let profileFiled: any = {}
            profileFiled.user = req.user._id
            if (company) profileFiled.company = company
            if (website) profileFiled.website = website
            if (location) profileFiled.location = location
            if (status) profileFiled.status = status
            if (bio) profileFiled.bio = bio
            if (githubUsername) profileFiled.githubUsername = githubUsername
            if (skills) {
                profileFiled.skills = skills.split(',').map(skill => skill.trim())
            }
            profileFiled.social = {}
            if (social) {
                if (social.facebook) profileFiled.social.facebook = social.facebook
                if (social.twitter) profileFiled.social.twitter = social.twitter
                if (social.youtube) profileFiled.social.youtube = social.youtube
                if (social.linkedin) profileFiled.social.linkedin = social.linkedin
                if (social.instagram) profileFiled.social.facebook = social.instagram
            }

            let profile = await profileModel.findOne({ user: req.user._id })

            if (profile) {
                profile = await profileModel.findOneAndUpdate({ user: req.user._id }, { $set: profileFiled }, { new: true })
                return res.send(profile)
            }
            profile = new profileModel(profileFiled)
            await profile.save()
            res.send(profile)

        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }
    }

    getProfile = async (req: Request, res: Response) => {
        try {
            const profile = await profileModel.findOne({ user: req.user._id }).populate('user', ['name', 'avatar'])
            if (!profile) {
                return res.status(400).send([{ msg: 'user does not create profile yet' }])
            }
            res.send(profile)

        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }

    }

    getAllprofile = async (req: Request, res: Response) => {
        try {
            const profiles = await profileModel.find().populate('user', ['name', 'avatar'])
            res.send(profiles)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }

    }
    getprofilebyid = async (req: Request, res: Response) => {
        try {
            const user: any = req.params.userid
            if (!user) {
                return res.status(400).send([{ msg: 'cant find user id' }])
            }
            const profile = await profileModel.findOne({ user }).populate('user', ['name', 'avatar'])
            if (!profile)
                return res.status(400).send([{ msg: 'user didnt create profile yet' }])
            res.send(profile)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }


    }

    deleteprofile = async (req: Request, res: Response) => {
        try {
            await postModel.deleteMany({ user: req.user._id })
            const profile = await profileModel.findOneAndRemove({ user: req.user._id })
            if (!profile)
                return res.status(400).send([{ msg: 'your profile information didnt create til now' }])
            await userModel.findOneAndDelete({ _id: req.user._id })
            res.send('profile deleted')
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }

    }

    addExperience = async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).send(errors.array())
        const { title, company, location, from, to, current, description }:
            { title: string, company: string, location: string, from: Date, to: Date, current: boolean, description: string } = req.body
        const experience: Experience = {
            _id: mongoose.Types.ObjectId(),
            title,
            company,
            location,
            from
        }
        if (to) experience.to = to
        if (current) experience.current = current
        if (description) experience.description = description
        try {
            const profile = await profileModel.findOne({ user: req.user._id })
            if (!profile) {
                return res.send([{ msg: 'Complete profile Information first' }])
            }
            if (!profile.experience)
                profile.experience = [experience]
            else
                profile.experience = [experience, ...profile.experience]

            await profile.save()
            res.send(profile)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }
    }

    deleteExperience = async (req: Request, res: Response) => {
        const experienceId = req.params.id
        const profile = await profileModel.findOne({ user: req.user._id })
        if (!profile)
            return res.status(400).send([{ msg: 'user have not profile yet' }])
        try {

            if (!profile.experience)
                return res.status(400).send([{ msg: 'you dont have experience' }])
            else
                profile.experience = profile.experience.filter(ex => String(ex._id) !== experienceId)
            console.log(experienceId);
            await profile.save()
            res.send(profile)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }
    }

    addEducation = async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).send(errors.array())
        const { school, degree, filedofstudy, from, to, current, description }:
            { school: string, degree: string, filedofstudy: string, from: Date, to: Date, current: boolean, description: string } = req.body
        const education: Education = {
            _id: mongoose.Types.ObjectId(),
            school,
            degree,
            filedofstudy,
            from
        }
        if (to) education.to = to
        if (current) education.current = current
        if (description) education.description = description
        try {
            const profile = await profileModel.findOne({ user: req.user._id })
            if (!profile) {
                return res.send([{ msg: 'Complete profile Information first' }])
            }
            if (!profile.education)
                profile.education = [education]
            else
                profile.education = [education, ...profile.education]
            await profile.save()
            res.send(profile)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }
    }

    deleteEducation = async (req: Request, res: Response) => {
        const educationId = req.params.id
        const profile = await profileModel.findOne({ user: req.user._id })
        if (!profile)
            return res.status(400).send([{ msg: 'user have not education yet' }])
        try {

            if (!profile.education)
                return res.status(400).send([{ msg: 'you dont have Education' }])
            else
                profile.education = profile.education.filter(ex => String(ex._id) !== educationId)
            await profile.save()
            res.send(profile)
        } catch (error) {
            res.status(500).send([{ msg: error.message }])
        }
    }

    githubRepo = (req: Request, res: Response) => {
        try {
            const username = req.params.username
            const option = {
                uri: `https://api.github.com/users/${username}/repos?per_page=5&sort=create:asc
                &client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
                method: 'GET',
                headers: { 'user-agent': 'node.js' }
            }
            request(option, (error, response, body) => {
                if (error) {
                    return res.status(400).send([{ msg: error }])
                }
                if (response.statusCode !== 200)
                    return res.status(404).send([{ msg: 'not github profile found' }])
                res.send(JSON.parse(body))
            })
        } catch (error) {
            res.status(400).send([{ msg: error.message }])
        }
    }
}

export default new profileController()