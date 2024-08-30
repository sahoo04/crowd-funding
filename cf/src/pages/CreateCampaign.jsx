import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import emailjs from '@emailjs/browser';
import "../index.css"

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils'; // Ensure this function is correctly implemented

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext(); // Ensure createCampaign is defined in context
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  // Handle form field changes
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        try {
          // Ensure target is a string
          const targetInUnits = ethers.utils.parseUnits(form.target.toString(), 18);

          // Create campaign
          await createCampaign({
            ...form,
            target: targetInUnits,
          });

          // Send email
          await emailjs.sendForm('service_6ebsd3q', 'template_3x3upj4', e.target, {
            publicKey: 'MvjbZWONJfXtHuOwZ',
          });

          navigate('/home');
        } catch (error) {
          console.error("Failed to create campaign or send email:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        alert('Provide a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="create-campaign-container">
      {isLoading && <Loader />}
      <div className="campaign-header">
        <h1>
          Start a Campaign
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-group">
          <FormField 
            labelName="Your Name *"
            placeholder="Ex: Sai Vamsi"
            inputType="text"
            name="user_name"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Give a short title"
            inputType="text"
            name="campaign_title"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
          labelName="Story *"
          placeholder="Write your story/description of your campaign"
          isTextArea
          name="campaign_description"
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="fund-raised-section">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 >
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="form-field">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            name="campaign_goal"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            name="campaign_deadline"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
          labelName="Campaign image *"
          placeholder="Place a logo/image URL of your campaign"
          inputType="url"
          name="campaign_image"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton 
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
