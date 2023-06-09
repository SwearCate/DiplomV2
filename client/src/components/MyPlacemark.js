import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Placemark } from '@pbe/react-yandex-maps';

const makeLayout = (layoutFactory, component, contentKey) => {
    const Layout = layoutFactory.createClass(`<div class="pin-container">      
	<div class="placemark-description">          
  	<p class="placemark-description__title">
    	${description.title}
    </p>          
   	<p class="placemark-description__subtitle">              
    	${description.subtitle.prefix}              
      <span class="placemark-description__price">
      	${description.subtitle.body}
      </span>              
      ${description.subtitle.postfix}          
    </p>      
  </div>      
  <div class="pin-container__pin">          
    <div class="placemark__background"></div>      
  </div>
</div>`, {
        build: function() {
            Layout.superclass.build.call(this);

            Layout.updateReactTree = () => ReactDOM.unstable_renderSubtreeIntoContainer(
                component,
                <div>{component.props[contentKey]}</div>,
                this.getElement().querySelector('div'),
            );

            Layout.updateReactTree();
        },
        clear: function() {
            Layout.updateReactTree = null;
            Layout.superclass.clear.call(this);
        },
    });
    return Layout;
};

class MyPlacemark extends React.Component {
    static contextTypes = {
        ymaps: PropTypes.object.isRequired,
    };

    static propTypes = {
        balloonContent: PropTypes.node.isRequired,
    };

    constructor(props, context) {
        super(props);

        this.balloonLayout = makeLayout(
            context.ymaps.templateLayoutFactory, this, 'balloonContent');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.balloonContent !== this.props.balloonContent) {
            if (this.balloonLayout.updateReactTree) {
                this.balloonLayout.updateReactTree();
            }
        }
    }

    render() {
        return (
            <Placemark
                {...this.props}
                options={{
                    balloonContentLayout: this.balloonLayout,
                    balloonPanelMaxMapArea: 0,
                    ...this.props.options,
                }}
            />
        );
    }
}

export default MyPlacemark;