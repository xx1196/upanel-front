import {useState} from "react";

export const useForm = (initialState = {}, onSubmit) => {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleStateChange = (name, value) => {
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = () => {
        onSubmit?.();
    }

    return {formData, handleInputChange, handleSubmit, handleStateChange};
}