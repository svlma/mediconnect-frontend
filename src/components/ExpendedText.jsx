import { Collapse, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const ExpandableText = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Collapse startingHeight={120} in={show}>
        {children}
      </Collapse>
      <Button onClick={handleToggle} className="btn">
        {show ? "Show less" : "Read more"}
      </Button>
    </>
  );
};

export default ExpandableText;
