import {classNames} from "shared/lib/classNames/classNames";

import cls from './SearchBar.module.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSearchData} from "widgets/MapBox/model/selectors/MapDataSelectors.ts";
import Select from 'react-select';
import {mapActions} from "widgets/MapBox/model/slice/MapBoxSlice.ts";


interface SearchBarProps {
    className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
    const {className = ""} = props;
    const [selectedOption, setSelectedOption] = useState(null);
    const [results, setResults] = useState([]);
    const searchData = useSelector(getSearchData);

    const dispatch = useDispatch();
    useEffect(() => {
        if (searchData?.length) {
            const res = searchData.reduce((acc, curr) => {
                const opt = {
                    value: curr.coords,
                    label: curr.name,
                }
                return [...acc, opt]
            }, []);
            setResults(res)
        }
    }, [searchData]);

    useEffect(() => {
        if (selectedOption) {

            dispatch(mapActions.setCenter(selectedOption.value))
        }
    }, [selectedOption, dispatch]);


    return (
        <div className={classNames(cls.SearchBar, {}, [className])}>
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={results}
            />
        </div>
    );
};
//
// export const SearchBar = (props: SearchBarProps) => {
//     const {className = ""} = props;
//     const [value, setValue] = useState('');
//     const [results, setResults] = useState([]);
//     const searchData = useSelector(getSearchData);
//     useEffect(() => {
//         if (searchData?.length) {
//             const d = searchData.filter(item => item.name.indexOf(value) !== -1);
//             setResults(d)
//         }
//     }, [value, searchData]);
//
//     return (
//         <div className={classNames(cls.SearchBar, {}, [className])}>
//             <Input value={value} onChange={setValue}/>
//             <select>
//                 {results.length > 0 && value.length > 0 && (
//                     results.map((item) => (
//                         <option key={item.name} value={item.name}>{item.name}</option>
//                     ))
//                 )}
//             </select>
//         </div>
//     );
// };
