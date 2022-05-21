import React from "react";
import { Helmet } from "react-helmet-async";

interface TagProps {
  [key: string]: any;
}

export const Link = (props: React.PropsWithChildren<TagProps>) => {
  const { children, ...tagProps } = props;
  return (
    <Helmet defer={true}>
      <link {...tagProps}>{children}</link>
    </Helmet>
  );
};

export const Meta = (props: React.PropsWithChildren<TagProps>) => {
  const { children, ...tagProps } = props;
  return (
    <Helmet defer={true}>
      <meta {...tagProps}>{children}</meta>
    </Helmet>
  );
};

export const Style = (props: React.PropsWithChildren<TagProps>) => {
  const { children, ...tagProps } = props;
  return (
    <Helmet defer={true}>
      <style {...tagProps}>{children}</style>
    </Helmet>
  );
};

export const Title = (props: React.PropsWithChildren<TagProps>) => {
  const { children, ...tagProps } = props;
  return (
    <Helmet defer={true}>
      <title {...tagProps}>
        {children}
        {" | Cryptosouvenirs"}
      </title>
    </Helmet>
  );
};
