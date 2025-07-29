import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

// 1. Corrected typo: "filterType"
const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    // 2. Use an object to store a selection for EACH filter type
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    // 3. This handler updates the state object for the correct category
    const handleValueChange = (filterType, value) => {
        const newFilters = {
            ...selectedFilters,
            [filterType]: value,
        };
        setSelectedFilters(newFilters);

        // 4. Dispatch directly from the handler. This is simpler than useEffect for user events.
        // NOTE: Your `setSearchedQuery` action may need to be updated
        // to handle an object of filters `{Location: "Bangalore", ...}` instead of a single string.
        dispatch(setSearchedQuery(newFilters));
    };

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data) => (
                    <div key={data.filterType} className='my-4'>
                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {/* 5. Each category gets its OWN RadioGroup component */}
                        <RadioGroup
                            value={selectedFilters[data.filterType] || ''}
                            onValueChange={(value) => handleValueChange(data.filterType, value)}
                        >
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `${data.filterType}-${idx}`; // More semantic ID
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    );
};

export default FilterCard;