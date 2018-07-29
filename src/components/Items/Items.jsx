import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/bind";
import { get } from "lodash";

import { getItemURL } from "../../apis/cdn";
import styles from "./Items.module.scss";

const cx = classnames.bind(styles);

const Item = ({ id, name }) => {
  return (
    <li className={cx("item")} title={name || "empty item"}>
      {id > 0 && <img src={getItemURL(id)} alt={name} />}
    </li>
  );
};

const Items = ({
  className,
  staticItems,
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6
}) => {
  return (
    <div className={cx(className)}>
      <ul>
        <Item id={item0} name={get(staticItems, [item0, "name"])} />
        <Item id={item1} name={get(staticItems, [item1, "name"])} />
        <Item id={item2} name={get(staticItems, [item2, "name"])} />
        <Item id={item3} name={get(staticItems, [item3, "name"])} />
        <Item id={item4} name={get(staticItems, [item4, "name"])} />
        <Item id={item5} name={get(staticItems, [item5, "name"])} />
        <Item id={item6} name={get(staticItems, [item6, "name"])} />
      </ul>
    </div>
  );
};

const ItemType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string
};

Items.propTypes = {
  className: PropTypes.string,
  staticItems: PropTypes.object.isRequired,
  item0: PropTypes.number.isRequired,
  item1: PropTypes.number.isRequired,
  item2: PropTypes.number.isRequired,
  item3: PropTypes.number.isRequired,
  item4: PropTypes.number.isRequired,
  item5: PropTypes.number.isRequired,
  item6: PropTypes.number.isRequired
};

Items.defaultProps = {
  className: ""
};

export default Items;
