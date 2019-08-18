import React from 'react';
import folderImage from "../../../../img/icons/folder.svg";

const Folder = ({folderObject: folder = {}, onListChange, checkedCategories}) => {
  const getChildren = (children) => {
    return children.map(child => <Folder key={child.id} folderObject={child} onListChange={onListChange}  checkedCategories={checkedCategories}/>)
  };
  const isChecked = checkedCategories.includes(folder.id);
  const onChangeHandler = e => {
    let categoriesArray = [...checkedCategories];
    if (e.target.checked) {
      categoriesArray.push(folder.id);
    } else {
      categoriesArray = categoriesArray.filter(item => item !== folder.id)
    }
    onListChange(categoriesArray);
  };

  return (
    <div>
      {folder.name !== "ROOT" &&
      <div className={`filter-item`}>
        <input
          type="checkbox"
          value={1}
          onChange={onChangeHandler}
          checked={isChecked}
          indeterminate={true}
        />
        <img src={folderImage} alt=""/>
        <span>{folder.name}</span>
      </div>
      }
      {
        folder.children &&
        <ul>
          {getChildren(folder.children)}
        </ul>
      }
    </div>
  )
};

export default Folder;
