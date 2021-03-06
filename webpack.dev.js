/* eslint-disable @typescript-eslint/no-var-requires */
/*
Copyright IBM Corporation 2020

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8080';

module.exports = merge(common('development'), {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        host: HOST,
        port: PORT,
        compress: true,
        inline: true,
        historyApiFallback: true,
        hot: true,
        overlay: true,
        open: true,
        proxy: {
            '/api/**': {
                target: 'http://move2kubeapi:8080',
                changeOrigin: true,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules/patternfly'),
                    path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
                    path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css'),
                    path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/base.css'),
                    path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly'),
                    path.resolve(
                        __dirname,
                        'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css',
                    ),
                    path.resolve(
                        __dirname,
                        'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css',
                    ),
                    path.resolve(
                        __dirname,
                        'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css',
                    ),
                ],
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});
