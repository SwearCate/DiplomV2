import {Helmet} from "react-helmet";

const MyHead = () => {
    return (
        <div>
            <Helmet
                htmlAttributes={{"lang": "ru", "amp": undefined}} // amp takes no value
                title="My Title"
                titleTemplate="MySite.com - %s"
                defaultTitle="My Default Title"
                script={[
                    {"src": "https://api-maps.yandex.ru/3.0/?apikey=3245f75b-f1e7-4de6-bcc8-a3d7cb991f4c&lang=ru_RU", "type": "text/javascript"},
                    {"type": "text/javascript"}
                ]}
            />
        </div>
    );
}

export default MyHead;
