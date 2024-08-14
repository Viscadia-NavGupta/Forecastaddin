import React, { useEffect, useState, useCallback } from "react";
import * as excelfunctions from "./ExcelMidleware/excelFucntions";
import { Container, LinkButton, LinkText, BoldText, MessageBox, Heading, Index } from "./ACEnavigationstyles";

const DynamicButtonComponent = () => {
  const [tableOfContents, setTableOfContents] = useState(null);
  const [dataFrame, setDataFrame] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [message, setMessage] = useState("Please select ACE Sheet");

  useEffect(() => {
    const fetchTableOfContents = async () => {
      let sheetname = await excelfunctions.getActiveSheetName();
      if (sheetname !== "Model Management" && sheetname !== "outputs") {
        try {
          // Fetching from columns H to M now
          const { tableOfContents, dataFrame } = await excelfunctions.getColumnHtoK(sheetname);
          setTableOfContents(tableOfContents);
          setDataFrame(dataFrame);
          setMessage("");
        } catch (error) {
          console.error("Error fetching values:", error);
          setMessage("Error fetching values.");
        }
      }
    };

    fetchTableOfContents();
  }, []);

  const handleButtonClick = async (address) => {
    let sheetname = await excelfunctions.getActiveSheetName();
    if (sheetname !== "Model Management" && sheetname !== "outputs") {
      excelfunctions.highlightAndScrollToSubstring(sheetname, address);
    }
  };

  const handleExpandCollapse = (key) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const renderTableOfContents = useCallback((items, level = 0, parentKey = '') => {
    if (!items) return null;

    return items.map((item, index) => {
      const key = `${parentKey}-${index}`;
      const isExpanded = !!expandedItems[key];
      const isFlow = item.value.includes("Flow");

      return (
        <div key={key} style={{ marginLeft: `${level * 20}px` }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isFlow ? (
              <BoldText>{item.value}</BoldText>
            ) : (
              <LinkButton onClick={() => handleButtonClick(item.address)}>
                <Index>.</Index>
                <LinkText>{item.value}</LinkText>
              </LinkButton>
            )}
            {!isFlow && item.children.length > 0 && (
              <button onClick={() => handleExpandCollapse(key)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color:'#BFBFBF' }}>
                {isExpanded ? '▼' : '▶'}
              </button>
            )}
          </div>
          {isExpanded && renderTableOfContents(item.children, level + 1, key)}
        </div>
      );
    });
  }, [expandedItems]);

  return (
    <Container>
      <Heading>• Click on any assumption to navigate >></Heading>
      {tableOfContents ? (
        renderTableOfContents(tableOfContents)
      ) : (
        message && <MessageBox>{message}</MessageBox>
      )}
    </Container>
  );
};

export default DynamicButtonComponent;
