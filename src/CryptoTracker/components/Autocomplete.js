import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CancelIcon from "@material-ui/icons/Cancel";
import "./autocomplete.scss";

// Autocomplete Input
// Controlled input that tracks its value internally and reports it to the parent component via an `onChange` prop

// Interactions:
// - On focus/on click: options menu opens and user is able to type into the input
// - On change/on type: options menu is filtered by the enterered characters, value is tracked in internal state
// - On option click: option value populates the input, value is updated in internal state and reported to the parent component via `onChange`
// - On blur: currently entered value remains in input, value is reported to the parent component via `onChange`
// - On clear: value is cleared in internal state and an empty value is reported to the parent component via `onChange`

// States:
// - Default: placeholder text in input, menu is closed
// - Focused: Menu is open, input has focus
// - No matching options: Menu is open, "no results" message is shown
// - Populated: option text is shown, menu is closed, "clear" button appears in input UI

// TODO:
// - Styling
// - Clear button functionality
// - Option list sorting

const bolder = (searchTerm, optionLabel) => {
  const substring = new RegExp(searchTerm, "gi");
  const highlightedString = optionLabel.replace(
    substring,
    (match) => `<b>${match}</b>`
  );

  return <span dangerouslySetInnerHTML={{ __html: highlightedString }} />;
};

const Autocomplete = ({ label, onChange, options, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef();

  const onClose = () => {
    setIsOpen(false);
  };

  const onOptionSelect = (option) => {
    setInputValue(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  const onClear = () => {
    setInputValue("");
    onClose();
    onChange("");
  };

  const handleClickOutside = (e) => {
    // On click, if the click is outside this component then close the menu
    if (!containerRef.current.contains(e.target)) {
      setIsOpen(false);
      onChange(inputValue);
    }
  };

  // Bind a click event listener when the menu gets opened
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  let filteredOptions = options;
  if (inputValue) {
    filteredOptions = options.filter(
      (option) =>
        option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  return (
    <div className="autocomplete" ref={containerRef}>
      <label className="autocomplete__label">{label}</label>
      <div className="autocomplete__input-wrapper">
        <input
          type="text"
          className="autocomplete__input-wrapper__input"
          maxLength="14"
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          value={inputValue}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="autocomplete__input-wrapper__button-cancel"
          hidden={!inputValue || inputValue === ""}
          onClick={onClear}
        >
          <CancelIcon
            fontSize="inherit"
            className="autocomplete__input-wrapper__cancel"
          />
        </button>
        <button
          type="button"
          className="autocomplete__input-wrapper__button-expand"
          onClick={() => {
            if (!isOpen) setIsOpen(true);
            else setIsOpen(false);
          }}
        >
          <ExpandMoreIcon
            fontSize="inherit"
            className={
              !isOpen
                ? "autocomplete__input-wrapper__expand"
                : "autocomplete__input-wrapper__expand__unexpand"
            }
          />
        </button>
      </div>
      {isOpen && (
        <ul className="autocomplete__list">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="autocomplete__list__item"
              onClick={() => onOptionSelect(option)}
              role="button"
            >
              {bolder(inputValue, option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Autocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.string,
};

export default Autocomplete;
