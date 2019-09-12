package com.example.demo.exception;

public enum CodeErreurAppli {
    XAA("XAA", "Label already exist "),
    XAB("XAB", "Label is not valid "),
    XAC("XAC", "Label's Ids seems not be valid "),
    XAD("XAD", "Label's Id is not found. "),
    XBA("XBA","Weapon's Ids seems not be valid "),
    XBB("XBB","Weapon's Id is not found. "),
    XBC("XBC","Weapon's name is not valid "),
    XBD("XBD","Weapon's categories is not valid "),
    XBE("XBE","Weapon's damage is not valid "),
    XBF("XBF","Weapon's range is not valid "),
    XBG("XBG","Weapon's DPS is not valid "),
    XBH("XBG","Weapon's is null "),
    XCA("XCA","Armor's Ids seems not be valid "),
    XCB("XCB","Armor's Id is not found. "),
    XCC("XCC","Armor's name is not valid "),
    XCD("XCD","Armor's categories is not valid "),
    XCE("XCE","Armor's resistance is not valid "),
    XCF("XCF","Armor's point of defense is not valid "),
    XDA("XDA","Enchantement's Ids seems not be valid "),
    XDB("XDB","Enchantement's Id is not found. "),
    XDC("XDC","Enchantement's name is not valid "),
    XDD("XDD","Enchantement's description is not valid "),
    XDE("XDE","Enchantement's obtention is not valid "),
    XDF("XDF","Enchantement's level of defense is not valid ");


    private String code;

    private String message;


    CodeErreurAppli(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
