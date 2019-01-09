/**
 * Created by ink on 2018/4/9.
 */
import PropTypes from 'prop-types';

const Content = props => props.children;
Content.displayName = 'ProdRoot';
Content.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Content;
