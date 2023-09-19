class ApiFeatures {
  constructor(mongooseQuery, reqQuery) {
    this.mongooseQuery = mongooseQuery;
    this.reqQuery = reqQuery;
  }

  paginate(documentCount) {
    let page = this.reqQuery.page;
    let size = this.reqQuery.size;
    if (!page) page = 1;
    if (!size) size = 40;
    const limit = parseInt(size);
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // pagination results
    const pagination = {};
    pagination.currentPage = parseInt(page);
    pagination.numberOfPages = Math.ceil(documentCount / limit);
    // next page
    if (endIndex < documentCount) {
      pagination.next = pagination.currentPage + 1;
    }
    // previous page
    if (skip > 0) {
      pagination.prev = pagination.currentPage - 1;
    }

    this.mongooseQuery = this.mongooseQuery.find().skip(skip).limit(limit);
    this.paginationResults = pagination;
    return this;
  }

  sort() {
    let sortObj = this.reqQuery.sort;
    if (this.reqQuery.sort) {
      sortObj = sortObj.split(`,`).join(` `);
      this.mongooseQuery = this.mongooseQuery.sort(sortObj);
    } else {
      sortObj = `-createdAt`;
      this.mongooseQuery = this.mongooseQuery.sort(sortObj);
    }
    return this;
  }

  filter() {
    const filterObj = { ...this.reqQuery };
    const unwanted = [`page`, `size`, `sort`, `keyword`, `fields`];
    unwanted.forEach((element) => delete filterObj[element]);

    let filterObjStr = JSON.stringify(filterObj);
    filterObjStr = filterObjStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    filterObjStr = JSON.parse(filterObjStr);
    this.mongooseQuery = this.mongooseQuery.find(filterObjStr);
    return this;
  }

  fieldsLimiting() {
    let fieldsObj = this.reqQuery.fields;
    if (this.reqQuery.fields) {
      fieldsObj = fieldsObj.split(`,`).join(` `);
      this.mongooseQuery = this.mongooseQuery.select(fieldsObj);
    } else {
      this.mongooseQuery = this.mongooseQuery.select(`-__v`);
    }
    return this;
  }

  search(mongooseQueryName) {
    const keyword = this.reqQuery.keyword;
    if (this.reqQuery.keyword) {
      let searchObj = {};
      if (mongooseQueryName === `Products`) {
        searchObj.$or = [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ];
      } else {
        searchObj = { name: { $regex: keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(searchObj);
    }
    return this;
  }
}

module.exports = ApiFeatures;
