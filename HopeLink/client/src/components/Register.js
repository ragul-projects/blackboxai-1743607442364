import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validFields, setValidFields] = useState({});

  useEffect(() => {
    // Announce validation errors to screen readers
    if (showValidation && Object.keys(errors).length > 0) {
      const errorSummary = document.getElementById('error-summary');
      if (errorSummary) {
        errorSummary.focus();
      }
    }
  }, [showValidation, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (showValidation) {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };
    let validFieldsUpdate = { ...validFields };

    const setFieldValidity = (isValid, errorMessage = '') => {
      if (isValid) {
        delete fieldErrors[name];
        validFieldsUpdate[name] = true;
      } else {
        fieldErrors[name] = errorMessage;
        delete validFieldsUpdate[name];
      }
    };

    switch (name) {
      case 'firstName':
        setFieldValidity(
          value.trim().length > 0,
          'First name is required'
        );
        break;
      case 'lastName':
        setFieldValidity(
          value.trim().length > 0,
          'Last name is required'
        );
        break;
      case 'email':
        setFieldValidity(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          !value ? 'Email is required' : 'Please enter a valid email address'
        );
        break;
      case 'password':
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&]/.test(value);
        const isLongEnough = value.length >= 8;

        const requirements = [];
        if (!isLongEnough) requirements.push('at least 8 characters');
        if (!hasUpperCase) requirements.push('uppercase letter');
        if (!hasLowerCase) requirements.push('lowercase letter');
        if (!hasNumber) requirements.push('number');
        if (!hasSpecialChar) requirements.push('special character');

        setFieldValidity(
          requirements.length === 0,
          requirements.length > 0
            ? `Password must include ${requirements.join(', ')}`
            : ''
        );

        // Also validate confirm password
        if (formData.confirmPassword) {
          validateField('confirmPassword', formData.confirmPassword);
        }
        break;
      case 'confirmPassword':
        setFieldValidity(
          value === formData.password && value.length > 0,
          !value ? 'Please confirm your password' : 'Passwords do not match'
        );
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
    setValidFields(validFieldsUpdate);
    return Object.keys(fieldErrors).length === 0;
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    setShowValidation(true);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        errorElement?.focus();
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'An error occurred during registration'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClasses = 'input transition-all duration-200';
    if (!showValidation) return baseClasses;
    if (validFields[fieldName]) return `${baseClasses} border-green-300 focus:ring-green-500`;
    if (errors[fieldName]) return `${baseClasses} border-red-300 focus:ring-red-500`;
    return baseClasses;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <i className="fas fa-heart text-primary-600 text-4xl" aria-hidden="true"></i>
        </div>
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-soft sm:rounded-lg sm:px-10">
          {showValidation && Object.keys(errors).length > 0 && (
            <div 
              id="error-summary"
              className="mb-6 bg-red-50 border-l-4 border-red-400 p-4"
              role="alert"
              tabIndex="-1"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-circle text-red-400" aria-hidden="true"></i>
                </div>
                <div className="ml-3">
                  <h2 className="text-sm font-medium text-red-800">
                    Please fix the following errors:
                  </h2>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={getInputClassName('firstName')}
                    disabled={isLoading}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  />
                  {validFields.firstName && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fas fa-check text-green-500" aria-hidden="true"></i>
                    </div>
                  )}
                  {errors.firstName && (
                    <div className="mt-1 flex items-center text-sm text-red-600" id="firstName-error" role="alert">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.firstName}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={getInputClassName('lastName')}
                    disabled={isLoading}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  />
                  {validFields.lastName && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fas fa-check text-green-500" aria-hidden="true"></i>
                    </div>
                  )}
                  {errors.lastName && (
                    <div className="mt-1 flex items-center text-sm text-red-600" id="lastName-error" role="alert">
                      <i className="fas fa-exclamation-circle mr-1"></i>
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClassName('email')}
                  disabled={isLoading}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {validFields.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-check text-green-500" aria-hidden="true"></i>
                  </div>
                )}
                {errors.email && (
                  <div className="mt-1 flex items-center text-sm text-red-600" id="email-error" role="alert">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={getInputClassName('password')}
                  disabled={isLoading}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby="password-requirements password-error"
                />
                {validFields.password && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-check text-green-500" aria-hidden="true"></i>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500" id="password-requirements">
                  Must be at least 8 characters with uppercase, lowercase, number, and special character
                </p>
                {errors.password && (
                  <div className="mt-1 flex items-center text-sm text-red-600" id="password-error" role="alert">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={getInputClassName('confirmPassword')}
                  disabled={isLoading}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                />
                {validFields.confirmPassword && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-check text-green-500" aria-hidden="true"></i>
                  </div>
                )}
                {errors.confirmPassword && (
                  <div className="mt-1 flex items-center text-sm text-red-600" id="confirmPassword-error" role="alert">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary relative"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                    </span>
                    <span className="opacity-0">Create account</span>
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                type="button" 
                className="btn-outline"
                disabled={isLoading}
                aria-label="Sign up with Google"
              >
                <i className="fab fa-google mr-2" aria-hidden="true"></i>
                Google
              </button>
              <button 
                type="button" 
                className="btn-outline"
                disabled={isLoading}
                aria-label="Sign up with Facebook"
              >
                <i className="fab fa-facebook mr-2" aria-hidden="true"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;