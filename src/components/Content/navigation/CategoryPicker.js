import React, {useState} from 'react';
import folder from '../../../img/icons/folder.svg';
import './CategoryPicker.css';
import Folder from "./Folder/Folder";

const CategoryPicker = ({categoriesTree = {}, checkedCategories = [], onChange}) => {
  const [categoriesList, setCategoriesList] = useState(checkedCategories);
  return (
    <Folder checkedCategories={categoriesList} folderObject={categoriesTree} onListChange={newList => setCategoriesList(newList)}/>
  )
};

export default CategoryPicker
