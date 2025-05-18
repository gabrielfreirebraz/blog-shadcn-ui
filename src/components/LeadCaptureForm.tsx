"use client";

import { useEffect, useState } from "react";

type LeadCaptureFormProps = {
  title: string;
};

export const LeadCaptureForm = ({ title }: LeadCaptureFormProps) => {
  const formId = process.env.NEXT_PUBLIC_EMAILOCTOPUS_FORM_ID;
  const scriptSrc = `https://eocampaign1.com/form/${formId}.js`;

  useEffect(() => {
    const wrapper = document.getElementById('email-octopus-wrapper');
    if (!wrapper) return; 

    const existingScript = document.querySelector(
      `script[src="${scriptSrc}"]`
    );
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      script.dataset.form = formId;

      script.onload = () => {
        const inlineContainer = wrapper.querySelector('.inline-container');
        if (inlineContainer) {
          while (inlineContainer.firstChild) {
            wrapper.appendChild(inlineContainer.firstChild);
          }
          inlineContainer.remove();
        }
      };

      wrapper.appendChild(script);
    }
  }, [formId, scriptSrc]);

  return (
    <div className="w-full mx-auto">
      <br/><br/>
      <div
        id="email-octopus-wrapper"
        className="email-octopus-form-wrapper w-full flex justify-center
          [&_.d-inline-block]:w-10 [&_.d-inline-block]:h-auto"
        data-form={formId}
      />
    </div>
  );
};

