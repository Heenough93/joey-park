import React from 'react';
import { Button } from '@mui/material';

import { useModalContext } from '../../hooks';


interface Props extends React.HTMLProps<HTMLButtonElement> {
}

const CustomButton = ({ children, className, onClick }: Props) => {
  //
  // const modalContext = useModalContext();
  //
  // const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   //
  //   const result = await modalContext.setModalContent(
  //     'Delete Confirmation!',
  //     <div style={{border: "2px solid blue", padding: "10px"}}>
  //       <p>
  //         Are you sure you want to delete
  //         {/*<strong>[{person.id}</strong> - <span style={{fontSize: "18px"}}><i> {person.last_name}, {person.first_name}]</i></span> */}
  //         from the database?
  //       </p>
  //       <img width="100" style={{display: "block", margin: "0 auto"}} src="https://www.pngmart.com/files/7/Danger-Sign-PNG-Transparent.png"/>
  //     </div>
  //   );
  //   result && onClick && onClick(event);
  // };

  return (
    <Button className={className} onClick={() => {}}>
      {children}
    </Button>
  )
};

export default CustomButton;