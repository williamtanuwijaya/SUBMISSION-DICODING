import Input from "./input";
import React from "react";

const Header = ({ search, updateQuery }) => {
  return (
    <header className="header">
      <h1 >Notes</h1>
      <Input
        value={search}
        onChange={updateQuery}
        type='search'
        id='search_note'
        name='search_note'
        placeholder='Cari catatan...'
      />
    </header>
  );
};

export default Header;
