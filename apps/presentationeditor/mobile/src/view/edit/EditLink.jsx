import React, {useState, useEffect} from 'react';
import {observer, inject} from "mobx-react";
import {f7, List, ListItem, Page, Navbar, Icon, ListButton, ListInput, Segmented, Button, NavRight, Link} from 'framework7-react';
import { useTranslation } from 'react-i18next';
import {Device} from "../../../../../common/mobile/utils/device";

const PageTypeLink = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const [typeLink, setTypeLink] = useState(props.curType);

    const settings = props.storeFocusObjects.settings;
    if (settings.indexOf('hyperlink') === -1) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={_t.textLinkType} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            <Icon icon='icon-expand-down'/>
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textExternalLink} radio checked={typeLink === 1} onClick={() => {setTypeLink(1); props.changeType(1);}}></ListItem>
                <ListItem title={_t.textSlideInThisPresentation} radio checked={typeLink === 0} onClick={() => {setTypeLink(0); props.changeType(0);}}></ListItem>
            </List>
        </Page>
    )
};

const PageLinkTo = props => {
    const isAndroid = Device.android;
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const slidesCount = props.slidesCount;
    const [stateTypeTo, setTypeTo] = useState(props.curTo);

    const changeTypeTo = (type) => {
        setTypeTo(type);
        props.changeTo(type);
    };

    const [stateNumberTo, setNumberTo] = useState(props.numberTo);

    const changeNumber = (curNumber, isDecrement) => {
        setTypeTo(4);
        let value;

        if (isDecrement) {
            value = Math.max(0, --curNumber);
        } else {
            value = Math.min(slidesCount - 1, ++curNumber);
        }

        setNumberTo(value);
        props.changeTo(4, value);
    };

    const settings = props.storeFocusObjects.settings;
    if (settings.indexOf('hyperlink') === -1) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={_t.textLinkTo} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            <Icon icon='icon-expand-down'/>
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textNextSlide} radio checked={stateTypeTo === 0} onClick={() => {changeTypeTo(0)}}></ListItem>
                <ListItem title={_t.textPreviousSlide} radio checked={stateTypeTo === 1} onClick={() => {changeTypeTo(1)}}></ListItem>
                <ListItem title={_t.textFirstSlide} radio checked={stateTypeTo === 2} onClick={() => {changeTypeTo(2)}}></ListItem>
                <ListItem title={_t.textLastSlide} radio checked={stateTypeTo === 3} onClick={() => {changeTypeTo(3)}}></ListItem>
                <ListItem title={_t.textSlideNumber}>
                    {!isAndroid && <div slot='after-start'>{stateNumberTo + 1}</div>}
                    <div slot='after'>
                        <Segmented>
                            <Button outline className='decrement item-link' onClick={() => {changeNumber(stateNumberTo, true);}}>
                                {isAndroid ? <Icon icon="icon-expand-down"></Icon> : ' - '}
                            </Button>
                            {isAndroid && <label>{stateNumberTo + 1}</label>}
                            <Button outline className='increment item-link' onClick={() => {changeNumber(stateNumberTo, false);}}>
                                {isAndroid ? <Icon icon="icon-expand-up"></Icon> : ' + '}
                            </Button>
                        </Segmented>
                    </div>
                </ListItem>
            </List>
        </Page>
    )
};

const PageLink = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const url = props.url;
    const tooltip = props.tooltip;
    const display = props.display;
    const slideNum = props.slideNum;
    const slideLink = props.slideLink;
    const valueTypeLink = props.typeLink;

    const typesDisplayTo = {
        0: `${_t.textNextSlide}`,
        1: `${_t.textPreviousSlide}`,
        2: `${_t.textFirstSlide}`,
        3: `${_t.textLastSlide}`,
        4: `${_t.textSlide} ${slideNum + 1}`
    };

    const [typeLink, setTypeLink] = useState(valueTypeLink);
    const textType = typeLink === 1 ? _t.textExternalLink : _t.textSlideInThisPresentation;

    const changeType = (newType) => {
        setTypeLink(newType);
    };

    const [link, setLink] = useState(typeLink !== 0 ? url : '');
    const [linkTo, setLinkTo] = useState(slideLink);
    const [displayTo, setDisplayTo] = useState(typesDisplayTo[slideLink]);
    const [numberTo, setNumberTo] = useState(slideNum);

    const changeTo = (type, number) => {
        setLinkTo(type);
        switch (type) {
            case 0 : setDisplayTo(_t.textNextSlide); break;
            case 1 : setDisplayTo(_t.textPreviousSlide); break;
            case 2 : setDisplayTo(_t.textFirstSlide); break;
            case 3 : setDisplayTo(_t.textLastSlide); break;
            case 4 : setDisplayTo(`${_t.textSlide} ${number + 1}`); setNumberTo(number); break;
        }
    };

    const [screenTip, setScreenTip] = useState(tooltip);
    const displayDisabled = display !== false && display === null;
    const [stateDisplay, setDisplay] = useState(display !== false ? ((display !== null) ? display : _t.textDefault) : "");

    return (
        <Page>
            <Navbar title={_t.textLink} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            <Icon icon='icon-expand-down'/>
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List inlineLabels className='inputs-list'>
                <ListItem link={'/edit-link-type/'} title={_t.textLinkType} after={textType} routeProps={{
                    changeType,
                    curType: typeLink,
                    initLink: props.initLink
                }} />
                {typeLink !== 0 ?
                    <ListInput label={_t.textLink}
                               type="text"
                               placeholder={_t.textLink}
                               value={link}
                               onChange={(event) => {setLink(event.target.value)}}
                    /> :
                    <ListItem link={'/edit-link-to/'} title={_t.textLinkTo} after={displayTo} routeProps={{
                        changeTo: changeTo,
                        curTo: linkTo,
                        numberTo: numberTo,
                        initLink: props.initLink,
                        slidesCount: props.slidesCount
                    }}/>
                }
                <ListInput label={_t.textDisplay}
                           type="text"
                           placeholder={_t.textDisplay}
                           value={stateDisplay}
                           disabled={displayDisabled}
                           onChange={(event) => {setDisplay(event.target.value)}}
                />
                <ListInput label={_t.textScreenTip}
                           type="text"
                           placeholder={_t.textScreenTip}
                           value={screenTip}
                           onChange={(event) => {setScreenTip(event.target.value)}}
                />
            </List>
            <List className="buttons-list">
                <ListButton title={_t.textEditLink}
                            className={`button-fill button-raised${typeLink === 1 && link.length < 1 && ' disabled'}`}
                            onClick={() => {
                                props.onEditLink(typeLink, (typeLink === 1 ?
                                    {url: link, display: stateDisplay, tip: screenTip, displayDisabled: displayDisabled } :
                                    {linkTo: linkTo, numberTo: numberTo, display: stateDisplay, tip: screenTip, displayDisabled: displayDisabled}));
                            }}
                />
                <ListButton title={_t.textRemoveLink}
                            className={`button-red button-fill button-raised`}
                            onClick={() => {
                                props.onRemoveLink()
                            }}
                />
            </List>
        </Page>
    )
};

const _PageLinkTo = inject("storeFocusObjects")(observer(PageLinkTo));
const _PageTypeLink = inject("storeFocusObjects")(observer(PageTypeLink));

export {PageLink as EditLink,
        _PageLinkTo as PageLinkTo,
        _PageTypeLink as PageTypeLink}